import GfxObject from 'Object/Object';

/**
 * Very basic wrapper for canvas drawing methods
 * Incomplete: missing translate, rotates, scale support
 */
export default class Canvas extends GfxObject {
    constructor(name, options) {
        super(name, options);

        this.w = options.w || 0;
        this.h = options.h || 0;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.radius = options.radius || this.w / 2;
        this.color = options.color || "red";

    }

    draw(ctx, debug) {
        this._applyMask(ctx, this.x, this.y);

        if (!this.isFxQueueEmpty()) {
            this.executeFx(ctx);
        }

        this.ctx = ctx;
        const oldAlpha = ctx.globalAlpha;
        ctx.globalAlpha = this.opacity;
        this.render();
        ctx.globalAlpha = oldAlpha;

        this._undoMask();
    }

    /**
     * User should redefine this
     */
    render() {

    }

    fill(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    rect(x, y, w, h, color) {
        const ctx = this.ctx;

        ctx.fillStyle = color;
        ctx.fillRect(this.x + x, this.y + y, w, h);
    }

    ellipse() {

    }
};