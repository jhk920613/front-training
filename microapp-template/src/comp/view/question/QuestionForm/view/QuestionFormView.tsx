import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, Button, Card, Checkbox, FormControl, Grid, Input, Tooltip, Typography } from '@nara.platform/react-ui';
import { AddCircle } from '@material-ui/icons';
// import { FileboxDetail } from '@nara.drama/depot';
import { Question } from '~/comp/api';
import { QuestionFormBase, TagList } from '~/comp/view/shared';


interface Props {
  question: Question;
  hashtag: string;
  hiddenTags: string[];
  maxLength: number;
  rows: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSecret: (event: React.ChangeEvent<HTMLInputElement>, secret: boolean) => void;
  onChangeHashtag: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAddHashtag: (event: React.MouseEvent) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  onDelete: (event: React.MouseEvent, index: number) => void;
  onSubmit: (event: React.MouseEvent) => void;
}


@autobind
@observer
class QuestionFormView extends ReactComponent<Props> {
  //
  render() {
    const {
      question, hiddenTags, hashtag, maxLength, rows, onChange, onChangeSecret, onChangeHashtag, onKeyPress, onDelete, onSubmit, onClickAddHashtag,
    } = this.props;

    return (
      <QuestionFormBase>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <QuestionFormBase.Content
                placeholder="제목"
                name="title"
                value={question.title}
                maxLength={maxLength}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Tooltip arrow title="작성자와 코치만 볼 수 있어요.">
                <FormControl.ControlLabel
                  label={
                    <Typography variant="h6" color="textSecondary">비밀글</Typography>
                  }
                  control={
                    <Checkbox
                      name="secret"
                      checked={question.secret}
                      onChange={onChangeSecret}
                    />
                  }
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box p={2}>
          <QuestionFormBase.Content
            placeholder="질문 내용을 입력하세요."
            name="sentences"
            value={question.sentences}
            maxLength={maxLength}
            rows={rows}
            onChange={onChange}
          />
        </Box>
        <Card>
          {/*<FileboxDetail*/}
          {/*  spaceId={question.id}*/}
          {/*  name={question.title}*/}
          {/*>*/}
          {/*  <FileboxDetail.Action />*/}
          {/*</FileboxDetail>*/}
        </Card>
        <Box p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Input
                placeholder="태그를 추가해 주세요."
                type="text"
                value={hashtag}
                onChange={onChangeHashtag}
                onKeyPress={onKeyPress}
                endAdornment={
                  <Input.Adornment position="end">
                    <Button.Icon
                      aria-label="add hashtag"
                      onClick={onClickAddHashtag}
                    >
                      {hashtag && !!hashtag.length ? <AddCircle color="primary" /> : null}
                    </Button.Icon>
                  </Input.Adornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TagList
                tags={question.hashtags}
                hiddenTags={hiddenTags}
                onDelete={onDelete}
              />
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <QuestionFormBase.Actions
            hideCamera
            valueLength={question.sentences.length}
            maxLength={maxLength}
            onSubmit={onSubmit}
          />
        </Box>
      </QuestionFormBase>
    );
  }
}

export default QuestionFormView;
