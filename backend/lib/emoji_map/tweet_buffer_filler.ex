defmodule EmojiMap.TweetBufferFiller do
  @moduledoc """
  Starts the TweetBroadcaster and multiple TweetPrinter. Then starts the
  Twitter Stream in a seperate process via Task.async so that we don't block
  our console. This should probably be done in a GenServer.
  """

  alias EmojiMap.TweetBroadcaster
  alias EmojiMap.TweetConsumer
  alias EmojiMap.TwitterStream

  def start() do
    try do
      TweetBroadcaster.start_link()

      # start multiple producers
      TweetConsumer.start_link()
      TweetConsumer.start_link()

      task = Task.async(fn ->
        TwitterStream.get_emoji_stream()
        # Here the interesting part happens. We Stream.map the notify function of the TweetBroadcaster in the stream. As soon as we enumerate over the stream (via Enum.to_list/1) every tweet will be sent to the TweetBroadcaster and from there broadcasted to all consumers (or kept in a queue)
        |> Stream.map(&TweetBroadcaster.sync_notify(&1))
        |> Enum.to_list()
      end)
      Task.await(task, 1000) # one sec
    catch
      :exit, {:timeout, {Task, :await, [_, 1000]}} ->
        {:allgood, :catch}
    end
  end
end
