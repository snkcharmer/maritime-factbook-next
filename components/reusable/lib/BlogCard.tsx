import { IconHeart } from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
} from '@mantine/core';
import { createStyles } from '@mantine/emotion';

interface BlogCardProps {
  image: string;
  title: string;
  country: string;
  description: string;
  onDetailsClick?: () => void;
  onLikeClick?: () => void;
}

export const BlogCard = ({
  image,
  title,
  country,
  description,
  onDetailsClick,
  onLikeClick,
}: BlogCardProps) => {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="space-between">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="light">
            {country}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={onDetailsClick}>
          Show details
        </Button>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          onClick={onLikeClick}
        >
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default BlogCard;

export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.white,
  },

  section: {
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
    width: '20px',
    height: '20px',
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));
