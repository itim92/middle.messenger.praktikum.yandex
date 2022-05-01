export class AbstractComponent {
    constructor(props = {}) {
        if (typeof props !== "object" || props.constructor !== Object) {
            props = {};
        }

        this.props = props;
    }

    render() {
        return "";
    }
}
