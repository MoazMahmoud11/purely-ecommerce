import { Form, useActionData, useRouteLoaderData } from "react-router-dom";
import InputField from "./InputField";

const CheckoutForm = () => {
  const data = useActionData();
  const { user } = useRouteLoaderData("root") || {}; // Get user from root loader
  return (
    <Form
      method="post"
      className="w-full p-6 sm:p-8 bg-white dark:bg-dark/40 dark:text-white rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-6"
      id="checkout-form"
    >
      <h2 className="text-2xl font-black tracking-tight text-dark dark:text-white mb-2">
        Shipping Details
      </h2>

      {/* {data && data.errors && (
        <ul className="text-red-500 text-sm list-disc pl-5">
            {Object.values(data.errors).map( (error) => (
                <li key={error}>{error}</li>
            ))}
        </ul>
    )
        } */}
      <InputField
        labelName={"Full Name"}
        type="text"
        id="fullName"
        placeholder="Moaz Mahmoud"
        name="fullName"
        defaultValue={user?.user_metadata?.fullName || ""} // Pre-fill full name
        error={data?.errors?.fullName}
      />

      <InputField
        labelName={"Email Address"}
        type="email"
        id="email"
        placeholder="your.email@example.com"
        name="email"
        defaultValue={user?.email || ""} // Pre-fill email
        error={data?.errors?.email}
        readOnly={true} // Make email read-only
      />

      <InputField
        labelName={"Street Address"}
        type="text"
        id="street"
        placeholder="123 Main St"
        name="street"
        error={data?.errors?.street}
      />

      <InputField
        labelName={"Phone Number"}
        type="tel"
        id="phoneNumber"
        placeholder="01223456789"
        name="phoneNumber"
        error={data?.errors?.phoneNumber}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <InputField
          labelName={"City"}
          type="text"
          id="city"
          placeholder="Ismailia"
          name="city"
          className="w-full"
          error={data?.errors?.city}
        />
        <InputField
          labelName={"Zip Code"}
          type="number"
          id="zip"
          placeholder="123"
          name="zip"
          className="w-full"
          error={data?.errors?.zip}
        />
      </div>
    </Form>
  );
};

export default CheckoutForm;
