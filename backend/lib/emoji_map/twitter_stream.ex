defmodule EmojiMap.TwitterStream do
  @moduledoc """
  We get a Twitter Stream from locations within a bounding box. The
  bounding box is so large that the tweets can come from all over the world.
  This way we make sure that we only receive geo-tagged tweets. The reason for
  this is: It isn't possible to search for hundreds of different keywords at
  once. Plus location isn't a filter. So we find tweets from either the location
  OR matching the keyword. We have to filter ourself.
  """

  @doc """
  The main function of this module. Gets the stream, filters for empty
  coordinates, filters for emojis and then returns a simpler map.
  """
  def get_emoji_stream do
    # Sometimes the coordinates are still empty. Probably when a place was selected.
    # Could be refined
    ExTwitter.stream_filter([locations: "-168.8,-57.3,174.4,84.1"], :infinity)
    |> Stream.filter(fn(x) -> x.coordinates != nil || x.place != nil end)
    |> Stream.filter(&has_emoji(&1.text))
    |> Stream.map(fn(x) ->
      coordinates = cond do
        x.coordinates != nil ->
          x.coordinates |> Map.fetch!(:coordinates)
          |> coord_arr_to_str
        x.place != nil ->
          x.place |> get_coordinates_from_place
          |> coord_arr_to_str
        true -> nil
      end

      emoji = first_emoji(x.text)

      %{emoji: emoji, text: x.text, screen_name: x.user.screen_name,
      profile_image_url: x.user.profile_image_url, coordinates: coordinates}
    end)
  end

  @doc """
  Checks wether or not an emoji is present.
  """
  def has_emoji(tweet) do
    case(Exmoji.Scanner.scan(tweet) |> Enum.count) do
      0 -> false
      _ -> true
    end
  end

  @doc """
  Returns the first emoji.
  """
  def first_emoji(tweet) do
    Exmoji.Scanner.scan(tweet)
    |> hd
    |> Exmoji.EmojiChar.render
  end

  @doc """
  Turn array with float numbers from Twitter API into String
  """
  def coord_arr_to_str(input_arr) do
    input_arr
    |> Enum.map(fn(x) -> "#{x}" end)
    |> Enum.join(",")
  end

  @doc """
  Places from the Twitter API are not a single point but a bouding box. For easy
  use we will just use the first coordinates. To find out more check here:
  https://dev.twitter.com/overview/api/tweets
  """
  def get_coordinates_from_place(%{bounding_box: %{coordinates: [bounding_box]}}) do
    bounding_box |> hd
  end

end
