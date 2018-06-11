import * as React from "react";

import { Icon, Left, ListItem, Right, Text } from "native-base";
import { connectStyle } from "native-base-shoutem-theme";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import ROUTES from "../navigation/routes";
import mapPropsToStyleNames from "native-base/src/utils/mapPropsToStyleNames";
import { ServicesState } from "../store/reducers/entities/services";
import { convertDateToWordDistance } from "../utils/convertDateToWordDistance";

export type OwnProps = Readonly<{
  senderServiceId: string;
  subject: string;
  key: string;
  date: Date;
  services: ServicesState;
  navigation: NavigationState;
}>;

export type Props = OwnProps;

/**
 * Implements a component that show a message in the MessagesScreen List
 */
class MessageComponent extends React.Component<Props> {
  public getSenderName(senderId: string, services: ServicesState): string {
    return services.byId[senderId].organization_name;
  }

  public render() {

    const { navigate } = this.props.navigation;
    const { subject, senderServiceId, date, key, services } = this.props;
    return (
      <ListItem
        key={key}
        onPress={(): boolean =>{
          navigate(ROUTES.MESSAGE_DETAILS, {
            message: subject
          })
        }
        }
      >
        <Left>
          <Text leftAlign={true} alternativeBold={true}>
            {this.getSenderName(senderServiceId, services)}
          </Text>
          <Text leftAlign={true}>{subject}</Text>
        </Left>
        <Right>
          <Text formatDate={true}>{convertDateToWordDistance(date)}</Text>
          <Icon rightArrow={true} name="chevron-right" />
        </Right>
      </ListItem>
    );
  }
}

const StyledMessageComponent = connectStyle(
  "NativeBase.MessageComponent",
  {},
  mapPropsToStyleNames

)(MessageComponent);
export default StyledMessageComponent;
