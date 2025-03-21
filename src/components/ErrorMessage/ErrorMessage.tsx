import classNames from 'classnames';
import { Error } from '../../types/Error';
import { getMessage } from '../../services/error';

type ErrorProps = {
  error: Error;
};

const ErrorMessage: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error.isVisible },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {getMessage(error)}
    </div>
  );
};

export default ErrorMessage;
