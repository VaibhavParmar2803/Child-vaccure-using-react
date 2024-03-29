import React, { useState } from 'react'
import Layout2 from '../components/Layout2'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle, CCarousel, CCarouselCaption, CCarouselItem, CCol, CForm, CFormInput, CImage, CRow, CTable } from '@coreui/react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useContact } from '../contaxt/ContactContaxt'
import { useAuth } from '../contaxt/AuthContext'
import { Toast } from 'primereact/toast'

const columns = [
    {
        key: 'Months',
        label: 'Birth',
        _props: { scope: 'col' },
    },
    {
        key: 'Vaccine',
        label: 'Vaccine',
        _props: { scope: 'col' },
    }
]

const items = [
    { id: 1, Months: '6 TO 7 MONTH', Vaccine: 'Vaccine A' },
    { id: 2, Months: '7 TO 8 MONTH', Vaccine: 'Vaccine B' },
    { id: 3, Months: '8 TO 9 MONTH', Vaccine: 'Vaccine C' },
    { id: 4, Months: '9 TO 10 MONTH', Vaccine: 'Vaccine D' },
    { id: 5, Months: '10 TO 11 MONTH', Vaccine: 'Vaccine E' },
    { id: 6, Months: '11 TO 12 MONTH', Vaccine: 'Vaccine F' },
    { id: 7, Months: '12 TO 13 MONTH', Vaccine: 'Vaccine G' },
    { id: 8, Months: '13 TO 14 MONTH', Vaccine: 'Vaccine H' },
    { id: 9, Months: '14 TO 15 MONTH', Vaccine: 'Vaccine I' },
    { id: 10, Months: '15 TO 16 MONTH', Vaccine: 'Vaccine J' },
    { id: 11, Months: '16 TO 17 MONTH', Vaccine: 'Vaccine K' },
    { id: 12, Months: '17 TO 18 MONTH', Vaccine: 'Vaccine L' },
    { id: 13, Months: '18 TO 19 MONTH', Vaccine: 'Vaccine M' },
    { id: 14, Months: '19 TO 20 MONTH', Vaccine: 'Vaccine N' },
    { id: 15, Months: '20 TO 21 MONTH', Vaccine: 'Vaccine O' },
    { id: 16, Months: '21 TO 22 MONTH', Vaccine: 'Vaccine P' },
    { id: 17, Months: '22 TO 23 MONTH', Vaccine: 'Vaccine Q' },
    { id: 18, Months: '23 TO 24 MONTH', Vaccine: 'Vaccine R' },
    { id: 19, Months: '24 TO 25 MONTH', Vaccine: 'Vaccine S' },
    { id: 20, Months: '25 TO 26 MONTH', Vaccine: 'Vaccine T' },
];

function MainPage() {
    const { createContact } = useContact()
    const { toast } = useAuth();

    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    const [contactDetail, setContactDetail] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createContact(contactDetail);
            if (!data.error) {
                setContactDetail({
                    fullName: "",
                    email: "",
                    phone: "",
                    message: ""
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout2>
            <Toast ref={toast} />
            <div>
                <div className='home' id='home'>
                    <CCarousel controls indicators>
                        <CCarouselItem>
                            <div className='overlay'></div>
                            <CImage className="d-block w-100 slider-img" src={'/vacine1.jpeg'} alt="slide 1" />
                            <CCarouselCaption className="d-none d-md-block z-1">
                                <div>
                                    <div className='silder-title'>
                                        Vaccination: Your Child's First Protection
                                    </div>
                                    <div className='slider-button'>
                                        <CButton className='submit-button' onClick={() => navigate('/book-appointment')}>Book Appointment</CButton>
                                    </div>
                                </div>
                            </CCarouselCaption>
                        </CCarouselItem>
                        <CCarouselItem>
                            <div className='overlay'></div>
                            <CImage className="d-block w-100 slider-img" src={'/vacine2.jpeg'} alt="slide 2" />
                            <CCarouselCaption className="d-none d-md-block z-1">
                                <div className='silder-title'>
                                    Vaccination: Your Child's First Protection
                                </div>
                            </CCarouselCaption>
                        </CCarouselItem>
                        <CCarouselItem>
                            <div className='overlay'></div>
                            <CImage className="d-block w-100 slider-img" src={'/vacine3.jpeg'} alt="slide 3" />
                            <CCarouselCaption className="d-none d-md-block z-1">
                                <div className='silder-title'>
                                    Vaccination: Your Child's First Protection
                                </div>
                            </CCarouselCaption>
                        </CCarouselItem>
                    </CCarousel>
                    <div className='cards'>
                        <div className='d-flex justify-content-center'>
                            <div className='d-flex left-card'>
                                <div>
                                    <Icon icon="material-symbols-light:vaccines-rounded" style={{ color: 'white' }} width={50} height={50} />
                                </div>
                                <div className='card-description'>
                                    <div className='card-title'>
                                        Total Vaccinations Doses
                                    </div>
                                    <div className='card-count'>
                                        20567
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex right-card'>
                                <div>
                                    <Icon icon="tabler:vaccine" style={{ color: 'white' }} width={50} height={50} />
                                </div>
                                <div className='card-description'>
                                    <div className='card-title'>
                                        Vaccinations done today
                                    </div>
                                    <div className='card-count'>
                                        20567
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='about' className='about_us d-flex'>
                <div className='left_container'>
                    <div className='title'>
                        ABOUT US
                    </div>
                    <div className='sub_title'>
                        Why your child should get vaccinated.
                    </div>
                    <div className='line'></div>
                    <div className='description mt-4'>
                        A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long.
                    </div>
                    <div className='mt-4'>
                        <ul>
                            <li>New Born</li>
                            <li>1 to 6 Month</li>
                            <li>6 to 9 Month</li>
                            <li>9 to 12 Month</li>
                            <li>1 to 5 Year</li>
                        </ul>
                    </div>
                    <div>
                        <button className='appointment_button' onClick={() => navigate('/book-appointment')}>Book Appointment</button>
                    </div>
                </div>
                <div className='right_container'>
                    <img src='/vacine3.jpeg' />
                </div>
            </div>
            <div className='services' id='services'>
                <div className='title'>
                    Baby Immunization Schedule Table (Base on IAPCOI Recommendation)
                    <div className='line'></div>
                </div>
                <div className='services_table'>
                    <CTable columns={columns} items={items} />
                </div>
            </div>
            <div className='faq' id='faq'>
                <div className='faq-img'>
                    <img src='/vaccines.png' />
                </div>
                <div className='faq-content'>
                    <div className='title'>
                        FAQ
                    </div>
                    <div className='sub_title'>
                        Frequently Asked Questions
                    </div>
                    <div className='line'></div>
                    <div className='mt-4 faq-list'>
                        <CAccordion activeItemKey={2}>
                            <CAccordionItem itemKey={1}>
                                <CAccordionHeader>Accordion Item #1</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>This is the first item's accordion body.</strong> It is hidden by default, until the
                                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                                    modify any of this with custom CSS or overriding our default variables. It's also worth noting
                                    that just about any HTML can go within the <code>.accordion-body</code>, though the transition
                                    does limit overflow.
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={2}>
                                <CAccordionHeader>Accordion Item #2</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                                    modify any of this with custom CSS or overriding our default variables. It's also worth noting
                                    that just about any HTML can go within the <code>.accordion-body</code>, though the transition
                                    does limit overflow.
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={3}>
                                <CAccordionHeader>Accordion Item #3</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                                    modify any of this with custom CSS or overriding our default variables. It's also worth noting
                                    that just about any HTML can go within the <code>.accordion-body</code>, though the transition
                                    does limit overflow.
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={4}>
                                <CAccordionHeader>Accordion Item #4</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                                    modify any of this with custom CSS or overriding our default variables. It's also worth noting
                                    that just about any HTML can go within the <code>.accordion-body</code>, though the transition
                                    does limit overflow.
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={5}>
                                <CAccordionHeader>Accordion Item #5</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                                    modify any of this with custom CSS or overriding our default variables. It's also worth noting
                                    that just about any HTML can go within the <code>.accordion-body</code>, though the transition
                                    does limit overflow.
                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>
                    </div>
                </div>
            </div>
            <div className='contact' id='contact'>
                <div className='contact-header'>
                    <div className='title'>
                        CONTACT US
                    </div>
                    <div className='sub_title'>
                        Feel Free To Contact US
                    </div>
                    <div className='line'></div>
                </div>
                <div className='contact-body'>
                    <div className='left-container'>
                        <div>
                            <div className='d-flex'>
                                <div className='me-4'>
                                    <Icon icon="bi:telephone-fill" className='contact-us-icons' height={60} width={60} />
                                </div>
                                <div>
                                    <h5 className='fw-bold'>Call to ask any question.</h5>
                                    <h7>9876655777</h7>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='me-4'>
                                    <Icon icon="fontisto:email" className='contact-us-icons' height={60} width={60} />
                                </div>
                                <div>
                                    <h5 className='fw-bold'>Email to get free quote.</h5>
                                    <h7>abc@gmail.com</h7>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='me-4'>
                                    <Icon icon="fluent:location-12-filled" className='contact-us-icons' height={60} width={60} />
                                </div>
                                <div>
                                    <h5 className='fw-bold'>Visit our office.</h5>
                                    <h7>Nikol, Ahmedabad</h7>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        <CForm onSubmit={handleSubmit}>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Your Full Name"
                                    value={contactDetail.fullName}
                                    onChange={(e) => setContactDetail({ ...contactDetail, fullName: e.target.value })}
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="email"
                                    placeholder="Enter Email Address"
                                    value={contactDetail.email}
                                    onChange={(e) => setContactDetail({ ...contactDetail, email: e.target.value })}
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Your Contact Number"
                                    value={contactDetail.phone}
                                    onChange={(e) => setContactDetail({ ...contactDetail, phone: e.target.value })}
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="text"
                                    placeholder="Message"
                                    value={contactDetail.message}
                                    onChange={(e) => setContactDetail({ ...contactDetail, message: e.target.value })}
                                />
                            </CRow>
                            <CRow>
                                <CButton className='submit-button' type='submit'>
                                    Request A Quote
                                </CButton>
                            </CRow>
                        </CForm>

                    </div>
                </div>
            </div>
            <div className='border-top d-flex justify-content-between p-4'>
                <div className='ms-4 fw-bold'>
                    ©{currentYear} CHILD VACCURE PVT LTD
                </div>
                <div className='d-flex fw-bold'>
                    <div className='me-4'>Terms</div>
                    <div className='me-4'>Privacy</div>
                    <div className='me-4'>Help</div>
                </div>
            </div>
        </Layout2>
    )
}

export default MainPage