import { useState, useEffect } from "react";
import { addNewContact, updateContact } from "../../services";
import "./style.css";

const InputContactForm = (props) => {
  const { handleGetContacts, selectedContact } = props;

  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    if (id > 0) {
      // Update contact if id is greater than 0
      await updateContact(id, {
        full_name: fullName,
        phone_number: phoneNumber,
        email,
      });
    } else {
      // Add new contact
      await addNewContact({
        full_name: fullName,
        phone_number: phoneNumber,
        email,
      });
    }

    handleGetContacts();
    resetInputValue();
  };

  const resetInputValue = () => {
    setId(0);
    setFullName("");
    setPhoneNumber("");
    setEmail("");
  };

  const allowSubmit = !(!fullName || !phoneNumber || !email);

  // Fill input fields when selectedContact changes
  useEffect(() => {
    if (selectedContact) {
      setId(selectedContact.id || 0);
      setFullName(selectedContact.full_name || "");
      setPhoneNumber(selectedContact.phone_number || "");
      setEmail(selectedContact.email || "");
    } else {
      resetInputValue();
    }
  }, [selectedContact]);

  return (
    <div className="input-contact__form-container">
      <h1 data-cy="header-title">Devcode Contact Manager</h1>
      <div className="input-contact__form">
        <label htmlFor="nama">Nama Lengkap</label>
        <div>
          <input
            data-cy="input-nama"
            type="text"
            name="nama"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Masukkan Nama Lengkap"
          />
        </div>
        <label htmlFor="telepon">No. Telepon</label>
        <div>
          <input
            data-cy="input-telepon"
            type="text"
            name="telepon"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Masukkan Nomor Telepon"
          />
        </div>
        <label htmlFor="email">Email</label>
        <div>
          <input
            data-cy="input-email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email"
          />
        </div>
        <button
          disabled={!allowSubmit}
          data-cy="btn-submit"
          onClick={handleSubmit}
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default InputContactForm;

