var links = document.querySelectorAll('link[rel="import"]');

[].forEach.call(links, function(link) {
    var template = link.import.querySelector('template');
    var clone = document.importNode(template.content, true);
    var el = link.getAttribute('data-el');
    document.querySelector(el).appendChild(clone);
});