describe('index', function () {
    var container, map;
    beforeEach(function () {
        container = document.createElement('div');
        container.style.width = '400px';
        container.style.height = '300px';
        document.body.appendChild(container);
        map = new maptalks.Map(container, {
            center : [0, 0],
            zoom : 17
        });
    });

    afterEach(function () {
        map.remove();
        maptalks.DomUtil.removeDomNode(container);
    });

    it('create plugin instance', function (done) {
        var layer = new maptalks.HelloLayer();
        layer.on('layerload', function () {
            expect(layer).to.be.painted();
            done();
        }).addTo(map);
    });
});
