import { Children, ReactElement } from 'react';

type ChildrenProps = {
  isTrue: boolean;
  children: ReactElement | ReactElement[];
};

type Props = {
  children: ReactElement<ChildrenProps>[];
};

export const Show = (props: Props) => {
  let when: ReactElement | null = null;
  let otherwise: ReactElement | null = null;

  Children.forEach(props.children, (children) => {
    if (children?.props?.isTrue === undefined) {
      otherwise = children;
    } else if (!when && !!children?.props?.isTrue) {
      when = children;
    }
  });

  return when ?? otherwise;
};

Show.When = ({ isTrue, children }: ChildrenProps) => (
  <>{isTrue ? children : ''}</>
);

Show.Else = ({ children }: Omit<ChildrenProps, 'isTrue'>) => <>{children}</>;
