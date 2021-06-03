import React from 'react';



class ReactComponent<Props = {}, State = {}, InjectedProps = {}> extends React.Component<Props, State> {
    //
    get injected(): InjectedProps {
        return this.props as any;
    }
}

export default ReactComponent;
