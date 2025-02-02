import { useRouter } from 'vue-router';

export const useRowLink = () => {
  const router = useRouter();

  const handleClick = path => {
    router.push(path);
  };

  return { handleClick };
};
