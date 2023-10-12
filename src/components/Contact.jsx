import React, { useState, useRef } from "react";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import { styles } from "../style";
// import emailjs from '@emailjs/browser'
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // toast.info("Form processing...", {
    //   position: "top-right",
    //   autoClose: 3000,
    // });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/contact/`,
      formData
    );
    try {
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setLoading(false);
      // console.log(err);
      toast.error("Something went wrong, Please try again", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    // emailjs.send('Serviceid','templateid',
    // {
    //   from_name:form.name,
    //   to_name: 'Austine',
    //   from_email: form.email,
    //   to_email: 'austinobravo@gmail.com',
    //   message: form.message
    // },
    // 'Api key'
    // )
    // .then(() => {
    //   setLoading(false)
    //   alert("Your message is sent.")
    //   setForm({
    //     name:'',email:'',message:'',
    //   })
    // }, (error) => {
    //   setLoading(false)
    //   console.log(error)
    //   alert('Something went wrong.')
    // })
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden ">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 ">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            required/>
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 ">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            required/>
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 ">Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write to me"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            required/>
          </label>
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
