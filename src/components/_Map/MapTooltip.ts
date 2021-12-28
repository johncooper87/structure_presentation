import ReactDOM from 'react-dom';
import AppProvider from 'app/AppProvider';
import styles from './styles.module.scss';

declare global {
  type TooltipRenderFn = (entityName: string, data: any) => ReactElement;
}

const overlap = 3;

class MapTooltip {
  private rootNode: HTMLDivElement;
  private currentTarget: Element;
  static renderFn: TooltipRenderFn = (entityName, data) => data;
  renderFn: TooltipRenderFn;

  constructor() {
    this.handleContainerMouseLeave = this.handleContainerMouseLeave.bind(this);
    this.handleLayerMouseLeave = this.handleLayerMouseLeave.bind(this);

    const rootNode = document.createElement('div');
    rootNode.classList.add(styles.tooltipContainer);
    rootNode.style.visibility = 'hidden';
    rootNode.addEventListener('mouseleave', this.handleContainerMouseLeave);
    this.rootNode = rootNode;
  }

  appendToBody() {
    document.body.appendChild(this.rootNode);
  }

  removeFromBody() {
    document.body.removeChild(this.rootNode);
  }

  close() {
    if (this.currentTarget !== undefined) {
      this.currentTarget.removeEventListener('mouseleave', this.handleLayerMouseLeave);
      this.currentTarget = undefined;
    }
    this.rootNode.style.visibility = 'hidden';
  }

  private handleContainerMouseLeave(event: MouseEvent) {
    if (event.relatedTarget !== this.currentTarget) this.close();
  }

  private handleLayerMouseLeave(event: MouseEvent) {
    if (!this.rootNode.contains(event.relatedTarget as Element)) this.close();
  }

  move(x: number, y: number) {
    const { rootNode } = this;
    rootNode.style.left = (x - overlap).toString() + 'px';
    rootNode.style.top = (y + overlap - rootNode.clientHeight).toString() + 'px';
  }

  open(event: MouseEvent, entityName: string, data: any) {
    const { target, pageX, pageY } = event;
    this.move(pageX, pageY);
    if (this.currentTarget === target) return;

    if (target instanceof Element) {
      // const { clientX, clientY } = event;
      const { rootNode } = this;
      this.currentTarget = target;
      ReactDOM.render(
        React.createElement(
          AppProvider,
          {},
          (this.renderFn ?? MapTooltip.renderFn)(entityName, data)
        ),
        rootNode
      );
      // this.move(clientX, clientY);
      rootNode.style.visibility = 'visible';
      target.addEventListener('mouseleave', this.handleLayerMouseLeave);
    }
  }

  show() {
    if (this.currentTarget !== undefined) this.rootNode.style.visibility = 'visible';
  }

  hide() {
    this.rootNode.style.visibility = 'hidden';
  }
}

export default MapTooltip;
