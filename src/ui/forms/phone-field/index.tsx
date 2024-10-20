import IntegerField from "../integer-field";

export default function PhoneField(
  { value, onChange = (value: string) => {}, ...rest },
  ref,
) {
  // function parse(val: any) {
  //   console.log(val);
  //   return val;
  // }

  return (
    <IntegerField value={value} onChange={(val) => onChange(val)} {...rest} />
  );
}
