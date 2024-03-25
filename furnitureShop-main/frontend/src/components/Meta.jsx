import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Urban Edge!',
  description:
    'Urban Edge offers unique, high-quality pieces for every room in your home.',
  keywords:
    'furniture, home decor, modern furniture, living room, bedroom, dining room, office furniture, stylish, quality, Urban Edge',
};

export default Meta;
