
import React from 'react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Button, List, Menu, MenuTypes, Typography } from '@nara.platform/react-ui';
import { Delete, Edit, MoreVert } from '@material-ui/icons';


interface Props {
  //
  onClickEdit?: (event: React.MouseEvent) => void;
  onClickRemove?: (event: React.MouseEvent) => void;
}

@autobind
class SubMenuView extends ReactComponent<Props> {
  //
  static defaultProps = {
    onClickEdit: undefined,
    onClickRemove: undefined,
  };

  render() {
    //
    const { onClickEdit, onClickRemove } = this.props;

    return (
      <Menu
        trigger={
          <Button.Icon size="small">
            <MoreVert />
          </Button.Icon>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {onClickEdit && (
          <Menu.Item
            onClick={(event: React.MouseEvent, params: MenuTypes.ClickItemParams) => {
              params.close();
              onClickEdit(event);
            }}
          >
            <List.ItemIcon><Edit /></List.ItemIcon>
            <Typography>Edit</Typography>
          </Menu.Item>
        )}
        {onClickRemove && (
          <Menu.Item
            onClick={(event: React.MouseEvent, params: MenuTypes.ClickItemParams) => {
              params.close();
              onClickRemove(event);
            }}
          >
            <List.ItemIcon><Delete /></List.ItemIcon>
            <Typography>Remove</Typography>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

export default SubMenuView;
