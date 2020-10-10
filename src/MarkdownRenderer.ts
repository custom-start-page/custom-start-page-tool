import { render } from 'ejs';
import marked from 'marked'

export default class MarkdownRenderer {
    render(md): string {
        var renderer = new marked.Renderer()

        var linkRender = function(href, title, text) {
            // If it is an external link...
            if (href.startsWith('http')) {
                return '<a target="_blank" href="'+ href +'">' + text + '</a>'
            }

            return '<a href="'+ href +'">' + text + '</a>'
        }

        renderer.link = linkRender

        renderer.image = function(href, title, text) {
            return '<img src="' + href + '" alt="' + text + '" style="max-width:100%;"></amp-img>'
        };

        marked.use({ renderer: renderer })

        return marked(md)
    }
};
