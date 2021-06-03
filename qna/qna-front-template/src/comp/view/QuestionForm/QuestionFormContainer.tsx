import React from 'react';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';
import QuestionFormView from './view/QuestionFormView';
import { QuestionStateKeeper } from '../../state';
import ReactComponent from '../shared/ReactComponent';
import {Question, QuestionCdo} from '../../api';


interface Props {
    groupId: string;
    writerId: string;
}

interface State {

}

interface InjectedProps {
    questionStateKeeper: QuestionStateKeeper;
}

@observer
@autobind
class QuestionFormContainer extends ReactComponent<Props, State, InjectedProps> {
    //
    componentDidMount() {
        //
        const { groupId, writerId } = this.props;
        const { questionStateKeeper } = this.injected;
        questionStateKeeper.init(groupId, writerId);
    }

    onChangeQuestionProps(event: React.ChangeEvent<HTMLInputElement>) {
        //
        const { questionStateKeeper } = this.injected;
        const name = event.target.name as keyof Question;
        const value = event.target.value;

        questionStateKeeper.setQuestionProp(name, value);
    }

    onRegisterQuestion() {
        //
        const { questionStateKeeper } = this.injected;
        const { question } = questionStateKeeper;

        if (question) {
            questionStateKeeper.register(QuestionCdo.fromModel(question, '1@1:1:1'));
        } else {
            // ....
        }
    }

    render() {
        //
        const { questionStateKeeper } = this.injected;
        const { question } = questionStateKeeper;

        if (!question) {
            return null;
        }

        return (
            <QuestionFormView
                title={question.title}
                sentences={question.sentences}
                secret={question.secret}
                onChangeProp={this.onChangeQuestionProps}
                onClickRegistrationButton={this.onRegisterQuestion}
            />
        );
    }
}

const getStores = () => {
    return {
        [QuestionStateKeeper.instanceName]: new QuestionStateKeeper()
    }
}

const withStateKeeper = (WrappedComponent: any) => {
    //
    class WithStateKeeperComponent extends React.Component {
        //
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...getStores()}
                />
            );
        }
    }

    return WithStateKeeperComponent as typeof QuestionFormContainer;
}

export default withStateKeeper(QuestionFormContainer);
