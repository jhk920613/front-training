import React from 'react';
import { QuestionForm } from '../comp';

class MainPage extends React.Component {
    //
    render() {
        //
        const groupId = "testGroup";
        const writerId = "testWriterId";

        return (
            <>
                <QuestionForm
                    groupId={groupId}
                    writerId={writerId}
                />
            </>
        )
    }

}

export default MainPage;
