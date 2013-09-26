module MarkupHelpers
  # Thumbnail tag with information
  def thumbnail(src, caption, *args)
    options = args.extract_options!

    # Set variables
    href = options[:href] ? options[:href] : src
    alt = options[:alt] ? options[:caption] : caption
    title = options[:title] ? options[:title] : alt

    figure = link_to image_tag(src, :alt => alt, :title => title, :class => "img-responsive"), href
    figure += content_tag :div, caption, :class => "caption"

    content_tag :div, figure, :class => "thumbnail"
  end

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