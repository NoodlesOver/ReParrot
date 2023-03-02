import React from "react";
import { withFormik } from "formik";
import { organizationFormSchema } from "../../schemas/organizationFormSchema";
import PropTypes from "prop-types";

function OrganizationRegisterForm(props) {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    backLabel,
    nextLabel,
    onBack,
  } = props;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="p-1">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${
              errors.name && touched.name && "is-invalid"
            }`}
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className={`form-control ${
              errors.description && touched.description && "is-invalid"
            }`}
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.description && touched.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="businessPhone">Phone Number</label>
          <input
            type="text"
            className={`form-control ${
              errors.businessPhone && touched.businessPhone && "is-invalid"
            }`}
            name="businessPhone"
            value={values.businessPhone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.businessPhone && touched.businessPhone && (
            <div className="invalid-feedback">{errors.businessPhone}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="siteUrl">Website Url</label>
          <input
            type="text"
            className={`form-control ${
              errors.siteUrl && touched.siteUrl && "is-invalid"
            }`}
            name="siteUrl"
            value={values.siteUrl}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.siteUrl && touched.siteUrl && (
            <div className="invalid-feedback">{errors.siteUrl}</div>
          )}
        </div>

        <div className="button-group lokiBtn">
          <button
            type="button"
            className="btn btn-sm btn-secondary my-2"
            onClick={onBack}
            disabled={true}
          >
            {backLabel}
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-primary mx-2 my-2"
            disabled={isSubmitting}
          >
            {nextLabel}
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

OrganizationRegisterForm.propTypes = {
  data: PropTypes.shape({
    organizationTypeId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired,
    businessPhone: PropTypes.string.isRequired,
    primaryLocationId: PropTypes.number.isRequired,
    siteUrl: PropTypes.string.isRequired,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    businessPhone: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  touched: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  backLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: props => ({
    name: props.data.name,
    description: props.data.description,
    businessPhone: props.data.businessPhone,
    siteUrl: props.data.siteUrl,
  }),

  validationSchema: organizationFormSchema,

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(OrganizationRegisterForm);
