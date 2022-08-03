import { forwardRef } from "react";
import { useRouterContext } from "../components/Router";
import hoistStatics from "hoist-non-react-statics";

const withRouter = (Component: React.ComponentType<any>) => {
  const WrapComponent = (props: any) => {
    const { wrappedComponentRef, ...remainingProps } = props;
    const context = useRouterContext();
    return (
      <Component ref={wrappedComponentRef} {...remainingProps} {...context} />
    );
  };
  return hoistStatics(
    forwardRef((props, ref) => {
      return <WrapComponent {...props} wrappedComponentRef={ref} />;
    }),
    Component
  );
};

export default withRouter;
