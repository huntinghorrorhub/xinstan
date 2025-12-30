import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: December 29, 2025</p>
        
        <div className="space-y-8 text-gray-600">
          <section>
            <p className="mb-4">
              This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>
            <p className="mb-4">
              We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interpretation and Definitions</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Interpretation</h3>
            <p className="mb-4">
              The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Definitions</h3>
            <p className="mb-4">For the purposes of this Privacy Policy:</p>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <strong>Business</strong>, for the purpose of the CCPA (California Consumer Privacy Act), refers to the Company as the legal entity that collects Consumers’ personal information and determines the purposes and means of the processing of Consumers’ personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers’ personal information, that does business in the State of California.
              </li>
              <li>
                <strong>Company</strong> (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to iGram IO, Unated States, Alaska. For the purpose of the GDPR, the Company is the Data Controller.
              </li>
              <li>
                <strong>Consumer</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.
              </li>
              <li>
                <strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
              </li>
              <li>
                <strong>Country</strong> refers to: Alaska, United States
              </li>
              <li>
                <strong>Data Controller</strong>, for the purposes of the GDPR (General Data Protection Regulation), refers to the Company as the legal person which alone or jointly with others determines the purposes and means of the processing of Personal Data.
              </li>
              <li>
                <strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
              </li>
              <li>
                <strong>Do Not Track (DNT)</strong> is a concept that has been promoted by US regulatory authorities, in particular the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing internet users to control the tracking of their online activities across websites.
              </li>
              <li>
                <strong>Personal Data</strong> is any information that relates to an identified or identifiable individual. For the purposes for GDPR, Personal Data means any information relating to You such as a name, an identification number, location data, online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity. For the purposes of the CCPA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.
              </li>
              <li>
                <strong>Sale</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer’s Personal information to another business or a third party for monetary or other valuable consideration.
              </li>
              <li>
                <strong>Service</strong> refers to the Website.
              </li>
              <li>
                <strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used. For the purpose of the GDPR, Service Providers are considered Data Processors.
              </li>
              <li>
                <strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.
              </li>
              <li>
                <strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
              </li>
              <li>
                <strong>Website</strong> refers to iGram, accessible from <a href="https://xinstan.com" className="text-pink-600 hover:underline">https://xinstan.com</a>
              </li>
              <li>
                <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable. Under GDPR (General Data Protection Regulation), You can be referred to as the Data Subject or as the User as you are the individual using the Service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Collecting and Using Your Personal Data</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Types of Data Collected</h3>
            
            <h4 className="text-lg font-medium text-gray-900 mb-2">Personal Data</h4>
            <p className="mb-4">
              While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Usage Data</li>
            </ul>

            <h4 className="text-lg font-medium text-gray-900 mb-2">Usage Data</h4>
            <p className="mb-4">Usage Data is collected automatically when using the Service.</p>
            <p className="mb-4">
              Usage Data may include information such as Your Device’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            </p>
            <p className="mb-4">
              When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
            </p>
            <p className="mb-4">
              We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
            </p>

            <h4 className="text-lg font-medium text-gray-900 mb-2">Tracking Technologies and Cookies</h4>
            <p className="mb-4">
              We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
            </p>
            <p className="mb-4">
              You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.
            </p>
            <p className="mb-4">
              Cookies can be “Persistent” or “Session” Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.
            </p>
            <p className="mb-4">We use both session and persistent Cookies for the purposes set out below:</p>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <strong>Necessary / Essential Cookies</strong><br/>
                Type: Session Cookies<br/>
                Administered by: Us<br/>
                Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
              </li>
              <li>
                <strong>Cookies Policy / Notice Acceptance Cookies</strong><br/>
                Type: Persistent Cookies<br/>
                Administered by: Us<br/>
                Purpose: These Cookies identify if users have accepted the use of cookies on the Website.
              </li>
              <li>
                <strong>Functionality Cookies</strong><br/>
                Type: Persistent Cookies<br/>
                Administered by: Us<br/>
                Purpose: These Cookies allow us to remember choices You make when You use the Website, such as language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
              </li>
              <li>
                <strong>Tracking and Performance Cookies</strong><br/>
                Type: Persistent Cookies<br/>
                Administered by: Third-Parties<br/>
                Purpose: These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website. We may also use these Cookies to test new pages, features or new functionality of the Website to see how our users react to them.
              </li>
              <li>
                <strong>Targeting and Advertising Cookies</strong><br/>
                Type: Persistent Cookies<br/>
                Administered by: Third-Parties<br/>
                Purpose: These Cookies track your browsing habits to enable Us to show advertising which is more likely to be of interest to You. These Cookies use information about your browsing history to group You with other users who have similar interests. Based on that information, and with Our permission, third party advertisers can place Cookies to enable them to show adverts which We think will be relevant to your interests while You are on third party websites.
              </li>
            </ul>
            <p className="mt-4">
              For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use of Your Personal Data</h2>
            <p className="mb-4">The Company may use Personal Data for the following purposes:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
              <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
              <li><strong>To contact You:</strong> To contact You by email, or other equivalent forms of electronic communication, such as a mobile application’s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
              <li><strong>To provide You with news, special offers and general information</strong> about other goods, services and events which we offer that are similar to those that you have enquired about unless You have opted not to receive such information.</li>
              <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
            </ul>
            <p className="mt-4 mb-2">We may share your personal information in the following situations:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to show advertisements to You to help support and maintain Our Service, to advertise on third party websites to You after You visited our Service, to contact You.</li>
              <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
              <li><strong>With Business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
              <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Retention of Your Personal Data</h2>
            <p className="mb-4">
              The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            </p>
            <p className="mb-4">
              The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transfer of Your Personal Data</h2>
            <p className="mb-4">
              Your information, including Personal Data, is processed at the Company’s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
            </p>
            <p className="mb-4">
              Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
            </p>
            <p className="mb-4">
              The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclosure of Your Personal Data</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Business Transactions</h3>
            <p className="mb-4">
              If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Law enforcement</h3>
            <p className="mb-4">
              Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Other legal requirements</h3>
            <p className="mb-4">The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
            <ul className="list-disc pl-5">
              <li>Comply with a legal obligation</li>
              <li>Protect and defend the rights or property of the Company</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>Protect the personal safety of Users of the Service or the public</li>
              <li>Protect against legal liability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security of Your Personal Data</h2>
            <p className="mb-4">
              The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Detailed Information on the Processing of Your Personal Data</h2>
            <p className="mb-4">
              Service Providers have access to Your Personal Data only to perform their tasks on Our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Analytics</h3>
            <p className="mb-4">We may use third-party Service providers to monitor and analyze the use of our Service.</p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                <strong>Google Analytics</strong>: Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network. You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information with Google Analytics about visits activity. For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: <a href="https://policies.google.com/privacy" className="text-pink-600 hover:underline">https://policies.google.com/privacy</a>
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Advertising</h3>
            <p className="mb-4">We may use Service providers to show advertisements to You to help support and maintain Our Service.</p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                <strong>Google AdSense & DoubleClick Cookie</strong>: Google, as a third party vendor, uses cookies to serve ads on our Service. Google’s use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our Service or other websites on the Internet. You may opt out of the use of the DoubleClick Cookie for interest-based advertising by visiting the Google Ads Settings web page: <a href="http://www.google.com/ads/preferences/" className="text-pink-600 hover:underline">http://www.google.com/ads/preferences/</a>
              </li>
              <li>
                <strong>LinkedIn</strong>: Their Privacy Policy can be viewed at <a href="https://www.linkedin.com/legal/privacy-policy" className="text-pink-600 hover:underline">https://www.linkedin.com/legal/privacy-policy</a>
              </li>
              <li>
                <strong>Facebook</strong>: Their Privacy Policy can be viewed at <a href="https://www.facebook.com/policy.php" className="text-pink-600 hover:underline">https://www.facebook.com/policy.php</a>
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Email Marketing</h3>
            <p className="mb-4">
              We may use Your Personal Data to contact You with newsletters, marketing or promotional materials and other information that may be of interest to You. You may opt-out of receiving any, or all, of these communications from Us by following the unsubscribe link or instructions provided in any email We send or by contacting Us.
            </p>
            <p className="mb-4">We may use Email Marketing Service Providers to manage and send emails to You.</p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Payments</h3>
            <p className="mb-4">
              We may provide paid products and/or services within the Service. In that case, we may use third-party services for payment processing (e.g. payment processors).
            </p>
            <p className="mb-4">
              We will not store or collect Your payment card details. That information is provided directly to Our third-party payment processors whose use of Your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.
            </p>
            <p className="mb-4">
              When You use Our Service to pay a product and/or service via bank transfer, We may ask You to provide information to facilitate this transaction and to verify Your identity.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Behavioral Remarketing</h3>
            <p className="mb-4">
              The Company uses remarketing services to advertise on third party websites to You after You visited our Service. We and Our third-party vendors use cookies to inform, optimize and serve ads based on Your past visits to our Service.
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                <strong>Google Ads (AdWords)</strong>: Google Ads (AdWords) remarketing service is provided by Google Inc. You can opt-out of Google Analytics for Display Advertising and customise the Google Display Network ads by visiting the Google Ads Settings page: <a href="http://www.google.com/settings/ads" className="text-pink-600 hover:underline">http://www.google.com/settings/ads</a>. Google also recommends installing the Google Analytics Opt-out Browser Add-on – <a href="https://tools.google.com/dlpage/gaoptout" className="text-pink-600 hover:underline">https://tools.google.com/dlpage/gaoptout</a> – for your web browser. Google Analytics Opt-out Browser Add-on provides visitors with the ability to prevent their data from being collected and used by Google Analytics. For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: <a href="https://policies.google.com/privacy" className="text-pink-600 hover:underline">https://policies.google.com/privacy</a>
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Usage, Performance and Miscellaneous</h3>
            <p className="mb-4">We may use third-party Service Providers to provide better improvement of our Service.</p>
            <ul className="list-disc pl-5">
              <li>
                <strong>Invisible reCAPTCHA</strong>: We use an invisible captcha service named reCAPTCHA. reCAPTCHA is operated by Google. The reCAPTCHA service may collect information from You and from Your Device for security purposes. The information gathered by reCAPTCHA is held in accordance with the Privacy Policy of Google: <a href="https://www.google.com/intl/en/policies/privacy/" className="text-pink-600 hover:underline">https://www.google.com/intl/en/policies/privacy/</a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">GDPR Privacy</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Legal Basis for Processing Personal Data under GDPR</h3>
            <p className="mb-4">We may process Personal Data under the following conditions:</p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Consent:</strong> You have given Your consent for processing Personal Data for one or more specific purposes.</li>
              <li><strong>Performance of a contract:</strong> Provision of Personal Data is necessary for the performance of an agreement with You and/or for any pre-contractual obligations thereof.</li>
              <li><strong>Legal obligations:</strong> Processing Personal Data is necessary for compliance with a legal obligation to which the Company is subject.</li>
              <li><strong>Vital interests:</strong> Processing Personal Data is necessary in order to protect Your vital interests or of another natural person.</li>
              <li><strong>Public interests:</strong> Processing Personal Data is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Company.</li>
              <li><strong>Legitimate interests:</strong> Processing Personal Data is necessary for the purposes of the legitimate interests pursued by the Company.</li>
            </ul>
            <p className="mb-4">
              In any case, the Company will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Your Rights under the GDPR</h3>
            <p className="mb-4">
              The Company undertakes to respect the confidentiality of Your Personal Data and to guarantee You can exercise Your rights.
            </p>
            <p className="mb-4">
              You have the right under this Privacy Policy, and by law if You are within the EU, to:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Request access to Your Personal Data.</strong> The right to access, update or delete the information We have on You. Whenever made possible, you can access, update or request deletion of Your Personal Data directly within Your account settings section. If you are unable to perform these actions yourself, please contact Us to assist You. This also enables You to receive a copy of the Personal Data We hold about You.</li>
              <li><strong>Request correction of the Personal Data that We hold about You.</strong> You have the right to to have any incomplete or inaccurate information We hold about You corrected.</li>
              <li><strong>Object to processing of Your Personal Data.</strong> This right exists where We are relying on a legitimate interest as the legal basis for Our processing and there is something about Your particular situation, which makes You want to object to our processing of Your Personal Data on this ground. You also have the right to object where We are processing Your Personal Data for direct marketing purposes.</li>
              <li><strong>Request erasure of Your Personal Data.</strong> You have the right to ask Us to delete or remove Personal Data when there is no good reason for Us to continue processing it.</li>
              <li><strong>Request the transfer of Your Personal Data.</strong> We will provide to You, or to a third-party You have chosen, Your Personal Data in a structured, commonly used, machine-readable format. Please note that this right only applies to automated information which You initially provided consent for Us to use or where We used the information to perform a contract with You.</li>
              <li><strong>Withdraw Your consent.</strong> You have the right to withdraw Your consent on using your Personal Data. If You withdraw Your consent, We may not be able to provide You with access to certain specific functionalities of the Service.</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Exercising of Your GDPR Data Protection Rights</h3>
            <p className="mb-4">
              You may exercise Your rights of access, rectification, cancellation and opposition by contacting Us. Please note that we may ask You to verify Your identity before responding to such requests. If You make a request, We will try our best to respond to You as soon as possible.
            </p>
            <p className="mb-4">
              You have the right to complain to a Data Protection Authority about Our collection and use of Your Personal Data. For more information, if You are in the European Economic Area (EEA), please contact Your local data protection authority in the EEA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">CCPA Privacy</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Your Rights under the CCPA</h3>
            <p className="mb-4">
              Under this Privacy Policy, and by law if You are a resident of California, You have the following rights:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>The right to notice.</strong> You must be properly notified which categories of Personal Data are being collected and the purposes for which the Personal Data is being used.</li>
              <li><strong>The right to access / the right to request.</strong> The CCPA permits You to request and obtain from the Company information regarding the disclosure of Your Personal Data that has been collected in the past 12 months by the Company or its subsidiaries to a third-party for the third party’s direct marketing purposes.</li>
              <li><strong>The right to say no to the sale of Personal Data.</strong> You also have the right to ask the Company not to sell Your Personal Data to third parties. You can submit such a request by visiting our “Do Not Sell My Personal Information” section or web page.</li>
              <li>
                <strong>The right to know about Your Personal Data.</strong> You have the right to request and obtain from the Company information regarding the disclosure of the following:
                <ul className="list-disc pl-5 mt-2">
                  <li>The categories of Personal Data collected</li>
                  <li>The sources from which the Personal Data was collected</li>
                  <li>The business or commercial purpose for collecting or selling the Personal Data</li>
                  <li>Categories of third parties with whom We share Personal Data</li>
                  <li>The specific pieces of Personal Data we collected about You</li>
                </ul>
              </li>
              <li><strong>The right to delete Personal Data.</strong> You also have the right to request the deletion of Your Personal Data that have been collected in the past 12 months.</li>
              <li>
                <strong>The right not to be discriminated against.</strong> You have the right not to be discriminated against for exercising any of Your Consumer’s rights, including by:
                <ul className="list-disc pl-5 mt-2">
                  <li>Denying goods or services to You</li>
                  <li>Charging different prices or rates for goods or services, including the use of discounts or other benefits or imposing penalties</li>
                  <li>Providing a different level or quality of goods or services to You</li>
                  <li>Suggesting that You will receive a different price or rate for goods or services or a different level or quality of goods or services.</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Exercising Your CCPA Data Protection Rights</h3>
            <p className="mb-4">
              In order to exercise any of Your rights under the CCPA, and if you are a California resident, You can email or call us or visit our “Do Not Sell My Personal Information” section or web page.
            </p>
            <p className="mb-4">
              The Company will disclose and deliver the required information free of charge within 45 days of receiving Your verifiable request. The time period to provide the required information may be extended once by an additional 45 days when reasonable necessary and with prior notice.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Do Not Sell My Personal Information</h3>
            <p className="mb-4">
              We do not sell personal information. However, the Service Providers we partner with (for example, our advertising partners) may use technology on the Service that “sells” personal information as defined by the CCPA law.
            </p>
            <p className="mb-4">
              If you wish to opt out of the use of your personal information for interest-based advertising purposes and these potential sales as defined under CCPA law, you may do so by following the instructions below.
            </p>
            <p className="mb-4">
              Please note that any opt out is specific to the browser You use. You may need to opt out on every browser that you use.
            </p>
            
            <h4 className="text-lg font-medium text-gray-900 mb-2">Website</h4>
            <p className="mb-4">You can opt out of receiving ads that are personalized as served by our Service Providers by following our instructions presented on the Service:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>From Our “Cookie Consent” notice banner</li>
              <li>Or from Our “CCPA Opt-out” notice banner</li>
              <li>Or from Our “Do Not Sell My Personal Information” notice banner</li>
              <li>Or from Our “Do Not Sell My Personal Information” link</li>
            </ul>
            <p className="mb-4">
              The opt out will place a cookie on Your computer that is unique to the browser You use to opt out. If you change browsers or delete the cookies saved by your browser, you will need to opt out again.
            </p>

            <h4 className="text-lg font-medium text-gray-900 mb-2">Mobile Devices</h4>
            <p className="mb-4">
              Your mobile device may give you the ability to opt out of the use of information about the apps you use in order to serve you ads that are targeted to your interests:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>“Opt out of Interest-Based Ads” or “Opt out of Ads Personalization” on Android devices</li>
              <li>“Limit Ad Tracking” on iOS devices</li>
            </ul>
            <p className="mb-4">
              You can also stop the collection of location information from Your mobile device by changing the preferences on your mobile device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">“Do Not Track” Policy as Required by California Online Privacy Protection Act (CalOPPA)</h2>
            <p className="mb-4">Our Service does not respond to Do Not Track signals.</p>
            <p className="mb-4">
              However, some third party websites do keep track of Your browsing activities. If You are visiting such websites, You can set Your preferences in Your web browser to inform websites that You do not want to be tracked. You can enable or disable DNT by visiting the preferences or settings page of Your web browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your California Privacy Rights (California’s Shine the Light law)</h2>
            <p className="mb-4">
              Under California Civil Code Section 1798 (California’s Shine the Light law), California residents with an established business relationship with us can request information once a year about sharing their Personal Data with third parties for the third parties’ direct marketing purposes.
            </p>
            <p className="mb-4">
              If you’d like to request more information under the California Shine the Light law, and if you are a California resident, You can contact Us using the contact information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">California Privacy Rights for Minor Users (California Business and Professions Code Section 22581)</h2>
            <p className="mb-4">
              California Business and Professions Code section 22581 allow California residents under the age of 18 who are registered users of online sites, services or applications to request and obtain removal of content or information they have publicly posted.
            </p>
            <p className="mb-4">
              To request removal of such data, and if you are a California resident, You can contact Us using the contact information provided below, and include the email address associated with Your account.
            </p>
            <p className="mb-4">
              Be aware that Your request does not guarantee complete or comprehensive removal of content or information posted online and that the law may not permit or require removal in certain circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Links to Other Websites</h2>
            <p className="mb-4">
              Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party’s site. We strongly advise You to review the Privacy Policy of every site You visit.
            </p>
            <p className="mb-4">
              We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to this Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="mb-4">
              We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the “Last updated” date at the top of this Privacy Policy.
            </p>
            <p className="mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, You can contact us:
            </p>
            <ul className="list-disc pl-5">
              <li>
                By visiting this page on our website: <a href="https://xinstan.com/" className="text-pink-600 hover:underline">https://xinstan.com/</a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
