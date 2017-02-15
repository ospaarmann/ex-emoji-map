defmodule EmojiMap.TweetConsumer do
  @moduledoc """
  The consumer side. Subscribes to the producer once it is started so when
  it crashes and the supervisor restarts it, it automatically re-subscribes
  """

  use GenStage

  @doc """
  Starts the consumer.
  """
  def start_link() do
    GenStage.start_link(__MODULE__, :ok)
  end

  def init(:ok) do
    # Starts a permanent subscription to the broadcaster
    # which will automatically start requesting items.
    {:consumer, :ok, subscribe_to: [EmojiMap.TweetBroadcaster]}
  end

  def handle_events(events, _from, state) do
    for event <- events do
      IO.inspect {self(), event, state}
    end
    {:noreply, [], state}
  end
end
