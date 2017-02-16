defmodule EmojiMap.MapChannel do
  @moduledoc """
  """

  use Phoenix.Channel

  def join("map:updates", _message, socket) do
    {:ok, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end
end
