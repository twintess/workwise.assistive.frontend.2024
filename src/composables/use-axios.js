import { ref, isRef, watch } from 'vue';
import axios from 'axios';

export const baseURL = 'https://localhost:7089';

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.href = `${baseURL}/api/auth/login`;
    }
  },
);

export const useAxiosPublic = async (init, url, method, body) => {
  const data = ref(init);
  const error = ref(null);

  const reload = async () => {
    try {
      const response = await axiosClient[method](url, body);
      data.value = response;
      error.value = null;
    } catch (exception) {
      error.value = exception;
    }
  };

  if (isRef(url)) {
    watch(url, reload);
  }

  await reload();

  return { data, error, reload };
};

export const useAxios = (init, url, method, body, callback) => {
  const data = ref(init);
  const error = ref(null);

  const reload = () => {
    axiosClient[method](url, body)
      .then(response => {
        data.value = response;
        error.value = null;
      })
      .catch(exception => {
        error.value = exception;

        if (exception.response.status === 401) {
          axiosClient
            .post('auth/token')
            .then(tokenResponse => {
              if (tokenResponse.status === 200) {
                axiosClient[method](url, body)
                  .then(innerResponse => {
                    data.value = innerResponse;
                    error.value = null;
                  })
                  .catch(exception => {
                    error.value = exception;
                    callback();
                  });
              }
            })
            .catch(() => {
              callback();
            });
        }
      });
  };

  if (isRef(url)) {
    watch(url, reload);
  }

  reload();

  return { data, error, reload };
};

export const useAxiosAsync = async (init, url, method, body, callback) => {
  const data = ref(init);
  const error = ref(null);

  const reload = async () => {
    try {
      const response = await axiosClient[method](url, body);
      data.value = response;
      error.value = null;
    } catch (exception) {
      error.value = exception;

      if (exception.response.status === 401) {
        try {
          const tokenResponse = await axiosClient.post('auth/token');

          if (tokenResponse.status === 200) {
            try {
              const innerResponse = await axiosClient[method](url, body);
              data.value = innerResponse;
              error.value = null;
            } catch (exception) {
              error.value = exception;
              callback();
            }
          }
        } catch (exception) {
          callback();
        }
      }
    }
  };

  if (isRef(url)) {
    watch(url, reload);
  }

  await reload();

  return { data, error, reload };
};
