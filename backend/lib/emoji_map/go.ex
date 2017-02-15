defmodule EmojiMap.Go do
  @moduledoc """
  Just call C.Go.go to run the whole show.
  """

  alias EmojiMap.TweetBufferFiller

  def go do
    TweetBufferFiller.start()
  end

end
