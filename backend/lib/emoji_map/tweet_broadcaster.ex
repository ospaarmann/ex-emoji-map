defmodule EmojiMap.TweetBroadcaster do
  @moduledoc """
  When events arrive and there are no consumers, we store the event in
  the queue alongside the process information that broadcasted the event. When
  consumers send demand and there are not enough events, we increase the pending
  demand. Once we have both the data and the demand, we acknowledge the process
  that has sent the event to the broadcaster and finally broadcast the event
  downstream.

  This follows very closely the example in the Docs on Bufferin Demand:
  https://hexdocs.pm/gen_stage/GenStage.html
  """

  use GenStage

  @doc "Starts the broadcaster."
  def start_link() do
    GenStage.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  @doc "Sends an event and returns only after the event is dispatched."
  def sync_notify(event, timeout \\ 5000) do
    GenStage.call(__MODULE__, {:notify, event}, timeout)
  end

  ## Callbacks

  def init(:ok) do
    {:producer, {:queue.new, 0}, dispatcher: GenStage.BroadcastDispatcher}
  end

  def handle_call({:notify, event}, from, {queue, pending_demand}) do
    # If you get confused here, have a look at Erlangs queue module
    # http://erlang.org/doc/man/queue.html
    queue = :queue.in({from, event}, queue)
    dispatch_events(queue, pending_demand, [])
  end

  def handle_demand(incoming_demand, {queue, pending_demand}) do
    dispatch_events(queue, incoming_demand + pending_demand, [])
  end

  defp dispatch_events(queue, 0, events) do
    {:noreply, Enum.reverse(events), {queue, 0}}
  end
  defp dispatch_events(queue, demand, events) do
    case :queue.out(queue) do
      {{:value, {from, event}}, queue} ->
        GenStage.reply(from, :ok)
        dispatch_events(queue, demand - 1, [event | events])
      {:empty, queue} ->
        {:noreply, Enum.reverse(events), {queue, demand}}
    end
  end
end
