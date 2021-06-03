import React from 'react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { observer } from 'mobx-react';

import { Button, Extension, LocalFileSelector } from '@nara.platform/react-ui';
import { PhotoCamera } from '@material-ui/icons';


interface Props {
  //
  onCompleteLoad: (reader: FileReader) => void;
}

@autobind
@observer
class ImageUploadButtonContainer extends ReactComponent<Props> {
  //
  onSelectFile(file: File) {
    //
    const { onCompleteLoad } = this.props;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      onCompleteLoad(reader);
    };
  }

  render() {
    //
    return (
      <LocalFileSelector
        trigger={<Button.Icon size="small"><PhotoCamera /></Button.Icon>}
        extensionWhitelist={[Extension.IMAGE]}
        onSelectFile={this.onSelectFile}
      />
    );
  }
}

export default ImageUploadButtonContainer;
