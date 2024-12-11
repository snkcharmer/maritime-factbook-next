import { Button, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs" c="white">
          {category}
        </Text>
        <Title order={3} className={classes.title} c="white">
          {title}
        </Title>
      </div>
      <Button className="dark-bg-btn">Read more</Button>
    </Paper>
  );
}

const data = [
  {
    image: '/uploads/Philippine-Maritime-Manpower-Factbook-2020-and-2021.jpg',
    title: '',
    category: '',
  },
  {
    image: '/uploads/Philippine-Maritime-Manpower-Factbook-2020-and-2021.jpg',
    title: '',
    category: '',
  },
  {
    image: '/uploads/Philippine-Maritime-Manpower-Factbook-2020-and-2021.jpg',
    title: '',
    category: '',
  },
  {
    image: '/uploads/Philippine-Maritime-Manpower-Factbook-2020-and-2021.jpg',
    title: '',
    category: '',
  },
];

export default function CardSection() {
  return (
    <SimpleGrid cols={4} spacing={30}>
      {data.map((item, idx) => (
        <Card key={idx} {...item} />
      ))}
    </SimpleGrid>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    height: 340,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `${theme.fontFamily || 'Greycliff CF'}, sans-serif`,
    fontWeight: 900,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));
