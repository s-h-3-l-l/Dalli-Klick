function random_color () {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

document.addEventListener("DOMContentLoaded", function() {
    const img = new Image();
    img.addEventListener("load", function() {
        const elem = document.getElementById("canvas");
        elem.width = img.naturalWidth;
        elem.height = img.naturalHeight;
        let num_tiles = 15;
        
        elem.classList.add("hide");
        const canvas = oCanvas.create({
            canvas: "#canvas"
        });
        
        const c_img = canvas.display.image({
            x: 0,
            y: 0,
            image: img
        });
        
        canvas.addChild(c_img, false);
        
        const radius = Math.max(canvas.width, canvas.height);
        
        const prototype = canvas.display.arc({
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: radius,
            pieSection: true
        });
        
        let end, lastEnd;
        for (let i = 0; i < num_tiles; ++i) {
            end = (i > 0 ? lastEnd : 0) + 360 / num_tiles - (i < 1 ? 90 : 0);
            
            const elem = prototype.clone({
                start: (i < 1 ? -90 : lastEnd),
                end: end,
                fill: random_color(),
            });
            canvas.addChild(elem);
            
            lastEnd = end;
        }
        
        canvas.redraw();
        elem.classList.remove("hide");
        
        document.getElementById("btn-hint").addEventListener("click", function() {
            if (num_tiles > 0) {
                const rand_idx = 1 + Math.floor(Math.random() * num_tiles);
                canvas.removeChildAt(rand_idx, true);
                num_tiles -= 1;
                
                if (num_tiles === 0) {
                    document.getElementById("btn-hint").disabled = true;
                    document.getElementById("btn-sol").disabled = true;
                }
            }
        });
        document.getElementById("btn-sol").addEventListener("click", function(){
            for (let i = 0; i < num_tiles; ++i) {
                canvas.removeChildAt(1, false);
            }
            num_tiles = 0;
            canvas.redraw();
            document.getElementById("btn-hint").disabled = true;
            document.getElementById("btn-sol").disabled = true;
        });
    });
    img.src = window.dalli_cfg.img;
});
