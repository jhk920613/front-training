import React from 'react';
import { NextRouter, withRouter } from 'next/router';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import {Question, QuestionList} from '@posco/qna';
import {Button, Card, Typography} from '@nara.platform/react-ui';

interface Props {
  router: NextRouter;
}

@autobind
class IndexPage extends ReactComponent<Props> {
  //
  onClickQuestion(event: React.MouseEvent, question: Question) {
    //
    const { router } = this.props;
    const questionId = question.id;
    router.push(`/question/list/${questionId}`)
  }

  render() {
    //
    return (
      <>
        <Typography>질문 리스트 페이지입니다.</Typography>
        <Button onClick={this.onClickQuestion}>상세페이지로</Button>
        <QuestionList
          groupId="testGroup"
          readerId="testWriter"
        >
          <QuestionList.Header />
          <Card>
            <Card.Content>
              <QuestionList.Content
                onClick={this.onClickQuestion}
              />
              <QuestionList.Pagination />
            </Card.Content>
          </Card>
        </QuestionList>
      </>
    );
  }
}

export default withRouter(IndexPage);
