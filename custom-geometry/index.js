const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
const GeometryBuilder = gr.lib.fundamental.Geometry.GeometryBuilder;
const GeometryUtility = gr.lib.fundamental.Geometry.GeometryUtility;
const Vector3 = gr.lib.math.Vector3;
GeometryFactory.addType("colored-sphere", {
    divVertical: {
        converter: "Number",
        defaultValue: 100
    },
    divHorizontal: {
        converter: "Number",
        defaultValue: 100
    }
}, (gl, attrs) => {
    const dH = attrs["divHorizontal"];
    const dV = attrs["divVertical"];
    return GeometryBuilder.build(gl, {
        indicies: {
            default: {
                generator: function*() {
                    yield* GeometryUtility.sphereIndex(0, dH, dV);
                },
                topology: WebGLRenderingContext.TRIANGLES
            },
            wireframe: {
                generator: function*() {
                    yield* GeometryUtility.linesFromTriangles(GeometryUtility.sphereIndex(0, dH, dV));
                },
                topology: WebGLRenderingContext.LINES
            }
        },
        verticies: {
            main: {
                size: {
                    position: 3,
                    normal: 3,
                    texCoord: 2,
                    color: 3
                },
                count: GeometryUtility.sphereSize(dH, dV),
                getGenerators: () => {
                    return {
                        position: function*() {
                            yield* GeometryUtility.spherePosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis(), dH, dV);
                        },
                        normal: function*() {
                            yield* GeometryUtility.sphereNormal(Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis(), dH, dV);
                        },
                        texCoord: function*() {
                            yield* GeometryUtility.sphereTexCoord(dH, dV);
                        },
                        color: function*() {
                            while (true) {
                                yield Math.random();
                            }
                        }
                    };
                }
            }
        }
    });
});
