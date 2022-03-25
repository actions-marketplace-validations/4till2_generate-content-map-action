const showdown = require('showdown')
const BASE_SHOWDOWN_OPTIONS = {metadata: true}
const SHOWDOWN_OPTIONS = {completeHTMLDocument: false, emoji: true, tasklists: true, moreStyling: true}

const convertMarkdownToHtml = (markdown, options = {}) => {
    const converter = new showdown.Converter({...BASE_SHOWDOWN_OPTIONS, ...options});
    let html = converter.makeHtml(markdown).replace(/[\n\r]/g, '');
    let metadata = converter.getMetadata()
    return {html: html, metadata: metadata}
}

const formatContent = (content, type) => {
    let {html, metadata} = convertMarkdownToHtml(content, type === 'html' ? SHOWDOWN_OPTIONS : null)

    return {
        content: (() => {
            switch (type) {
                case 'html':
                    return html;
                case 'markdown':
                    return content;
                default:
                    return;
            }
        })(),
        metadata: metadata
    }
}
module.exports = {formatContent}
