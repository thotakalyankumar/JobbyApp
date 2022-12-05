import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobProfileSection extends Component {
  state = {profileData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <>
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="name-heading">{name}</h1>
        <p className="bio">{shortBio}</p>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <button type="button" className="job-item-failure-button">
        Retry
      </button>
    </div>
  )

  renderJobProfileCard = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderEmploymentType = () => (
    <div className="salary-container">
      <h1 className="salary-heading">Type of Employment</h1>
      <ul className="salary-range-container">
        {employmentTypesList.map(employ => (
          <li className="checkbox-list-items" key={employ.employmentTypeId}>
            <input
              type="checkbox"
              className="check-radio"
              id={employ.employmentTypeId}
              value={employ.employmentTypeId}
            />
            <label htmlFor={employ.employmentTypeId} className="check-label">
              {employ.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRange = () => (
    <div className="salary-container">
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-range-container">
        {salaryRangesList.map(salary => (
          <li className="checkbox-list-items" key={salary.salaryRangeId}>
            <input
              type="radio"
              className="check-radio"
              id={salary.salaryRangeId}
              name="salary"
            />
            <label htmlFor={salary.salaryRangeId} className="check-label">
              {salary.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  render() {
    return (
      <div className="Job-Profile-details-Container">
        <div className="card-data-container">{this.renderJobProfileCard()}</div>
        <div className="Filters">
          <hr className="horizontal-line" />
          {this.renderEmploymentType()}
          <hr className="horizontal-line" />
          {this.renderSalaryRange()}
        </div>
      </div>
    )
  }
}
export default JobProfileSection
