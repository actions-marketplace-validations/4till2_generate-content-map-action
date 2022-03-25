const showdown = require('showdown')
const CONTENT_TYPES = ['markdown', 'html']
const SHOWDOWN_OPTIONS = {metadata: true, completeHTMLDocument: true, emoji: true, tasklists: true, moreStyling: true}

const convertMarkdownToHtml = (markdown) => {
    const converter = new showdown.Converter(SHOWDOWN_OPTIONS);
    let html = converter.makeHtml(markdown);
    let metadata = converter.getMetadata()
    return {html: html, metadata: metadata}
}

const formatContent = (content, type) => {
    if (!CONTENT_TYPES.includes(type)) throw Error('Invalid content type in formatter.js : formatContent()');

    let {html, metadata} = convertMarkdownToHtml(content, type)
    return {content: type === 'html' ? html : content, metadata: metadata}
}
module.exports = {formatContent}
