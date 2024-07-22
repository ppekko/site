var CoolPhysics = CoolPhysics || {};

CoolPhysics.dynamicViewport = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies,
        Query = Matter.Query;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // Disable gravity initially
    engine.world.gravity.y = 0;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent',
            wireframes: false
        }
    });
    render.canvas.style.overflow = 'auto';

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    function createBox(x, y, width, height, image, link) {
        var img = new Image();
        img.src = image;
        img.onload = function() {
            var imgWidth = img.naturalWidth;
            var imgHeight = img.naturalHeight;

            var xScale = width / imgWidth;
            var yScale = height / imgHeight;
            var scale = Math.min(xScale, yScale); // maintain aspect ratio

            var box = Bodies.rectangle(x, y, width, height, {
                isStatic: false,
                render: {
                    sprite: {
                        texture: image,
                        xScale: scale,
                        yScale: scale
                    }
                }
            });
            box.link = link; // Store the link in the box object
            Composite.add(world, box);
        };
    }
    function createGrid(rows, cols, boxWidth, boxHeight, imageUrls, links) {
        var spacing = Math.max(boxWidth, boxHeight) + 40;
        var startX = (window.innerWidth - cols * spacing) / 2;
        var startY = (window.innerHeight - rows * spacing/2) / 2;

        var boxes = [];
        var index = 0;

        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                var x = col + startX + col * spacing + boxWidth / 2;
                var y = startY + row * spacing + boxHeight / 2;
                x += (2*row);
                if (index >= imageUrls.length) break;

                var image = imageUrls[index];
                var link = links[index];

                createBox(x, y, boxWidth, boxHeight, image, link);
                index++;
            }
        }
        return boxes;
    }

    function updateBoundaries() {
        Composite.remove(world, walls);
        walls = [
            Bodies.rectangle(window.innerWidth / 2, -25, window.innerWidth, 50, { isStatic: true }), // top wall
            Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, { isStatic: true }), // bottom wall
            Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true }), // left wall
            Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true }) // right wall
        ];

        Composite.add(world, walls);
    }

    var imageUrls = [
        'images/r2.svg',
        'images/tdaw.svg',
        'images/jbi.svg',
        'images/dpgtk.svg',
        'images/snfl.svg',
        'images/up.svg',
    ];
    var links = [
        'https://github.com/ppekko/r2',
        'https://github.com/ppekko/tdaw',
        'https://github.com/ppekko/jbi',
        'https://github.com/ppekko/dpgtk',
        'https://github.com/ppekko/SimpleNFL',
        'https://github.com/ppekko/uniprofile',
    ];

    var rows = 3;
    var cols = 3;
    var boxWidth = 100;
    var boxHeight = 100;

    createGrid(rows, cols, boxWidth, boxHeight, imageUrls, links);

    var walls = [];
    updateBoundaries();

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
    });

    function handleViewportChange() {
        // Clear existing Matter.js content
        Composite.clear(world, true);

        // Create a modal message
        var modal = document.createElement('div');
        modal.id = 'resize-modal';
        modal.innerHTML = '<p>Viewport size changed! Please refresh.</p>';
        document.body.appendChild(modal);

        // Apply styles for the modal
        var message = document.getElementById('resize-modal');
        message.style.position = 'fixed';
        message.style.top = '0';
        message.style.left = '0';
        message.style.width = '100%';
        message.style.height = '100%';
        message.style.background = 'grey';
        message.style.color = 'white';
        message.style.display = 'flex';
        message.style.alignItems = 'center';
        message.style.justifyContent = 'center';
        message.style.fontSize = '20px';
        message.style.textAlign = 'center';
        message.style.zIndex = '1000';
        message.style.overflow = 'auto';

        // Ensure body can scroll
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }

    window.addEventListener('resize', handleViewportChange);

    // add double-click event listener
    render.canvas.addEventListener('dblclick', function(event) {
        var mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        var boxesToCheck = Composite.allBodies(world).filter(body => body.render.sprite);
        var bodies = Query.point(boxesToCheck, mousePosition);
        if (bodies.length > 0) {
            var clickedBox = bodies[0];
            if (clickedBox.link) {
                window.open(clickedBox.link, '_blank');
            }
        }
    });

    var isGravityZero = true;
    document.getElementById('gravity-button').addEventListener('click', function() {
        if (isGravityZero) {
            engine.world.gravity.y = 2.1;
        } else {
            engine.world.gravity.y = 0;
        }
        isGravityZero = !isGravityZero;
    });

    render.canvas.style.overflow = 'auto';

    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

CoolPhysics.dynamicViewport.title = 'cool stuff';
CoolPhysics.dynamicViewport.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = CoolPhysics.dynamicViewport;
}

CoolPhysics.dynamicViewport();
