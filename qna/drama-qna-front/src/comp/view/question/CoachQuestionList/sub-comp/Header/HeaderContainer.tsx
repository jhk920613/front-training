import React, { ContextType } from 'react';
import { autobind, ReactComponent, SortDirection } from '@nara.drama/prologue';
import { observer } from 'mobx-react';
import { FormControl, Radio, SubActions } from '@nara.platform/react-ui';
import QuestionListContext from '../../context/QuestionListContext';
import { TagList } from '../../../../shared';


@autobind
@observer
class HeaderContainer extends ReactComponent {
  //
  static contextType = QuestionListContext;

  context!: ContextType<typeof QuestionListContext>;

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    //
    const { questionList } = this.context;

    const sortDirection = event.target.value as SortDirection;

    questionList.onChangeSortDirection(sortDirection);
  }

  onDeleteTag(event: React.MouseEvent, index: number) {
    //
    const { tags, onRemoveTag } = this.context.questionList;

    onRemoveTag(tags[index]);
  }

  render() {
    //
    const { sortDirection, tags } = this.context.questionList;

    return (
      <SubActions>
        <SubActions.Left>
          <TagList
            tags={tags}
            onDelete={this.onDeleteTag}
          />
        </SubActions.Left>
        <SubActions.Right>
          <FormControl.ControlLabel
            label="Newest"
            control={
              <Radio
                className="base"
                name="radioGroup"
                value={SortDirection.Descending}
                checked={sortDirection !== SortDirection.Ascending}
                onChange={this.onChange}
              />
            }
          />
          <FormControl.ControlLabel
            label="Oldest"
            control={
              <Radio
                className="base"
                name="radioGroup"
                value={SortDirection.Ascending}
                checked={sortDirection === SortDirection.Ascending}
                onChange={this.onChange}
              />
            }
          />
        </SubActions.Right>
      </SubActions>
    );
  }
}

export default HeaderContainer;
