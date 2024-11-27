import {
  Anchor,
  Breadcrumbs,
  Container,
  type ContainerProps,
  Space,
  Title,
} from '@mantine/core';
import type { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  title: string;
  items?: { label: string; href: string }[];
} & Pick<ContainerProps, 'fluid'>;

export const PageContainer = ({
  children,
  title,
  items,
  fluid = true,
}: PageContainerProps) => {
  return (
    <Container px={0} fluid={fluid}>
      {items && items.length > 0 ? (
        <Breadcrumbs mb={20}>
          {items.map((item) => (
            <Anchor key={item.label} href={item.href} size="sm">
              {item.label}
            </Anchor>
          ))}
        </Breadcrumbs>
      ) : null}

      <Title order={4}>{title}</Title>

      <Space h="lg" />

      {children}
    </Container>
  );
};
