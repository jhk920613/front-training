
import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, Button } from '@nara.platform/react-ui';
import { Clear } from '@material-ui/icons';

import { WithStyles, withStyles } from './style';


interface Props extends WithStyles {
  base64AttachedImage: string;
  onRemoveImage: (event: React.MouseEvent) => void;
}


@autobind
@observer
class AttachedImageView extends ReactComponent<Props> {
  //
  render() {
    const { classes, base64AttachedImage, onRemoveImage } = this.props;

    return base64AttachedImage && (
      <Box className={classes.imgWrapper}>
        <img src={base64AttachedImage} alt="attachedImages" />
        <Button.Icon onClick={onRemoveImage}>
          <Clear />
        </Button.Icon>
      </Box>
    );
  }
}

export default withStyles(AttachedImageView);
