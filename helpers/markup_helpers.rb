module MarkupHelpers
  # Audio tag helper much like the image_tag helper
  def audio(src, type = nil)
    content_tag :audio, :controls => "controls" do
      tag :source, :src => src, :type => type || "audio/mpeg"
    end
  end

  # Generic class for an intrinsic ratio wrapper
  def intrinsic_ratio(src)
    content_tag :div, :class => "intrinsic-ratio" do
      content_tag :iframe, "&nbsp;", :src => src, :frameborder => "0"
    end
  end

  # Code to embed a YouTube video when given the id of the video
  def youtube(id)
    intrinsic_ratio "http://www.youtube.com/embed/#{id}?feature=oembed"
  end
end