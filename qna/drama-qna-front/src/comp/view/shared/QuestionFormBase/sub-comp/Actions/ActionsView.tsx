import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, Button, Typography } from '@nara.platform/react-ui';
import { Send } from '@material-ui/icons';

import { ImageUploadButton } from '~/comp/view/shared';
import { WithStyles, withStyles } from './style';


interface Props extends WithStyles {
  valueLength?: number;
  maxLength?: number;
  hideCamera?: boolean;
  onChangeImage?: (reader: FileReader) => void;
  onSubmit?: (event: React.MouseEvent) => void;
}


@autobind
@observer
class ActionsView extends ReactComponent<Props> {
  //
  static defaultProps = {
    valueLength: 0,
    maxLength: 0,
    hideCamera: false,
    onChangeImage: () => {},
    onSubmit: () => {},
  };

  render() {
    const { classes, valueLength, maxLength, hideCamera, onChangeImage, onSubmit } = this.propsWithDefault;

    return (
      <Box className={classes.actions} pt={1}>
        <Box mr={2}>
          <Typography display="inline">{valueLength}</Typography>
          {maxLength ? (
            <>
              <Typography display="inline">/</Typography>
              <Typography display="inline" color="textSecondary">{maxLength}</Typography>
            </>
          ) : null}
        </Box>
        {!hideCamera && (
          <ImageUploadButton onCompleteLoad={onChangeImage} />
        )}
        <Button color="primary" disabled={!!maxLength && valueLength > maxLength} onClick={onSubmit}><Send /> 등록</Button>
      </Box>
    );
  }
}

export default withStyles(ActionsView);
