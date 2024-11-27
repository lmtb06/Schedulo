/**
 * Factory de renderers
 * @interface
 */
class RendererFactory {
    getApiRenderer() {
        throw new Error("Méthode non implémentée");
    }

    getHtmlRenderer() {
        throw new Error("Méthode non implémentée");
    }
}

export { RendererFactory };
