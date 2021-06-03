
import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { TextField } from '@nara.platform/react-ui';
import { TextFieldProps } from '@material-ui/core';


type Props = Omit<TextFieldProps, 'value'> & {
  value: string;
  maxLength?: number;
}


@autobind
@observer
class ContentView extends ReactComponent<Props> {
  //
  static defaultProps = {
    placeholder: 'Leave a comment',
    rows: 1,
    maxLength: 0,
    onChange: () => {},
  };

  render() {
    const { value, maxLength, rows, onChange, ...otherProps } = this.propsWithDefault;

    return (
      <TextField
        {...otherProps}
        fullWidth
        multiline={rows !== 1}
        rows={rows}
        rowsMax={rows}
        value={value || ''}
        error={!!maxLength && value.length > maxLength}
        onChange={onChange}
      />
    );
  }
}

export default ContentView;
