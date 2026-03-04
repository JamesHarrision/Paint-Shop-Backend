import sanitize from "sanitize-html";

export const sanitizeHtml = (html: any) => {
  return html ? sanitize(
    html,
    {
      allowedTags: sanitize.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitize.defaults.allowedAttributes,
        img: ['src', 'alt', 'width', 'height']
      }
    }
  ) : null
}