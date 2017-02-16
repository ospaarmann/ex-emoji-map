defmodule EmojiMap.TweetBufferFiller do

  use GenServer

  alias EmojiMap.TweetBroadcaster
  alias EmojiMap.TweetConsumer
  alias EmojiMap.TwitterStream

  def start_link(opts \\ []) do
    {:ok, pid} = GenServer.start_link(__MODULE__, [], opts)
    # And immediately start the buffer filler process.
    # I am not sure if this is the best way to handle this.
    # Maybe someone can comment on this.
    start_buffer_filler()
    {:ok, pid}
  end

  def start_buffer_filler do
    GenServer.cast(:tweet_buffer_filler, {:start})
  end

  ## Server Callbacks

  def init([]) do
    {:ok, []}
  end

  def handle_cast({:start}, _from) do
    TweetBroadcaster.start_link()
    TweetConsumer.start_link()

    TwitterStream.get_emoji_stream()
    |> Stream.map(&TweetBroadcaster.sync_notify(&1))
    |> Enum.to_list()

    {:noreply, []}
  end
end
