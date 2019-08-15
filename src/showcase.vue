<template>
    <div class="editor-container">
        <div data-container="jointjs" data-testid="editorCanvas"/>
    </div>
</template>

<script>
    import * as joint from 'rappid/dist/joint.min';
    import 'rappid/dist/joint.min.css';

    import * as PaperScroller from 'rappid/dist/joint.ui.paperScroller.min';
    import 'rappid/dist/joint.ui.paperScroller.min.css';

    export default {
        name: 'showcase',
        mounted: function () {
            this._graph = new joint.dia.Graph();
            this._paper = new joint.dia.Paper({
                gridSize: 10,
                width: '100%',
                height: 200,
                defaultAnchor: { name: 'perpendicular' },
                defaultConnectionPoint: { name: 'boundary' },
                model: this._graph,
            });

            this._paperScroller = new PaperScroller.joint.ui.PaperScroller({
                paper: this._paper,
            });

            this.$el
                .querySelector('[data-container="jointjs"]')
                .append(this._paperScroller.render().el);

            setTimeout(() => {
                this.addGraphItem({ type: 'Start' });
                this._paperScroller.zoomToFit();
                console.log(this._paper.options.height);
                this._paperScroller.zoomToFit();
                console.log(this._paper.options.height);
                this._paper.scaleContentToFit();
                console.log(this._paper.options.height);
                this._paper.scaleContentToFit();
                console.log(this._paper.options.height);
            });
        },
        methods: {

            addGraphItem: function ({ type = 'Start', position = null } = {}) {
                const pn = joint.shapes.pn;
                const size = this._paper.getComputedSize();
                position = position ? position : { x: size.width - 60, y: 50 };

                const config = {
                    Start: {
                        constructor: 'Place',
                        attributes: {
                            '.label': {
                                text: 'Start',
                                fill: '#7c68fc',
                            },
                            '.root': {
                                stroke: '#9586fd',
                                'stroke-width': 3,
                            },
                            '.tokens > circle': {
                                fill: '#7a7e9b',
                            },
                            '.image': {
                                event: 'element:delete',
                            },
                        },
                        tokens: 1,
                    },
                };

                this._graph.addCell([
                    new pn[config[type].constructor]({
                        position: position,
                        attrs: config[type].attributes,
                        tokens: config[type].tokens,
                        isPrototype: true,
                        disco: {
                            poi: null,
                            questions: [],
                        },
                    }),
                ]);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .editor-container {
        width: 100%;
        margin-bottom: 10px;
        border: 1px solid #646464;
        background: white;
    }
</style>

