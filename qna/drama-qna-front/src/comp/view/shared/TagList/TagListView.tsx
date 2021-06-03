import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Avatar, Box, Chip, Typography } from '@nara.platform/react-ui';
import { WithStyles, withStyles } from './style';


interface Props extends WithStyles {
  tags: string[];
  hiddenTags?: string[];
  onClick?: (event: React.MouseEvent, index: number) => void;
  onDelete?: (event: React.MouseEvent, index: number) => void;
}


@autobind
@observer
class TagListView extends ReactComponent<Props> {
  //
  static defaultProps = {
    onClick: undefined,
    onDelete: undefined,
    hiddenTags: [],
  };

  render() {
    const { classes, tags, onClick, onDelete } = this.props;
    const { hiddenTags } = this.propsWithDefault;

    const filteredTags = tags.filter((tag) => !hiddenTags.includes(tag));

    return (
      <Box className={classes.chips}>
        {filteredTags.map((tag, index) => (
          <Chip
            size="small"
            key={index}
            className={classes.chip}
            avatar={<Avatar><Typography variant="h4">#</Typography></Avatar>}
            label={tag}
            onClick={onClick ? (event: React.MouseEvent) => onClick(event, index) : undefined}
            onDelete={onDelete ? (event: React.MouseEvent) => onDelete(event, index) : undefined}
          />
        ))}
      </Box>
    );
  }
}

export default withStyles(TagListView);
