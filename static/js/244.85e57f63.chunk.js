"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[244],{2244:function(e,t,n){n.r(t),n.d(t,{default:function(){return O}});var s=n(8489),o=n(7853),r=n(4531),i=n(1020),a=n(8334),c=n(2791),l=n(2177),u=n(678),d=n(4),_=n(3164),p=n(1992),f=n(3692),j=n(184);function x(e){(0,p.Z)(e);var t=(0,l.I0)(),n=(0,l.v9)((function(e){return e.profilePage.status})),s=(0,c.useState)(n),o=(0,u.Z)(s,2),r=o[0],i=o[1],a=(0,c.useState)(!1),d=(0,u.Z)(a,2),_=d[0],x=d[1];return(0,c.useEffect)((function(){i(n)}),[n]),(0,j.jsx)("div",{className:"profile__status__wrapper",children:(0,j.jsxs)("div",{className:"profile__status",style:{display:"flex"},children:[(0,j.jsx)("div",{children:"Status: "}),!_&&(0,j.jsx)("div",{onClick:function(){return x(!0)},className:"status__text",children:r||"----"}),_&&(0,j.jsx)("input",{onChange:function(e){i(e.currentTarget.value)},autoFocus:!0,onBlur:function(){x(!1),function(e){t((0,f.Nf)(e))}(r)},className:"status__input",value:r})]})})}var h=n(316),v={info__description__container:"ProfileData_info__description__container__gi1Qq",info__name:"ProfileData_info__name__wojJH",info__about:"ProfileData_info__about__idj9T",job__wrapper:"ProfileData_job__wrapper__9pfB4",job__looking:"ProfileData_job__looking__Q0Ip6",contact__wrapper:"ProfileData_contact__wrapper__KqXFt",editor:"ProfileData_editor__fnQ4u",input:"ProfileData_input__Mplzj"};function m(e){var t=e.contactKey,n=e.contactValue;return(0,j.jsxs)("div",{children:[t,": ",n]})}function g(e){var t=e.profile,n=e.isOwner,s=e.goToEditMode;return(0,j.jsxs)("div",{className:v.info__description__container,children:[(0,j.jsxs)("div",{className:v.info__name,children:["Name: ",t.fullName]}),(0,j.jsxs)("div",{className:v.info__about,children:["About me: ",t.aboutMe]}),(0,j.jsxs)("div",{className:v.job__wrapper,children:[(0,j.jsxs)("div",{className:v.job__looking,children:["Looking for a job: ",t.lookingForAJob?"YES":"NO"]}),t.lookingForAJob&&(0,j.jsxs)("div",{className:v.job__looking,children:["My skills: ",t.lookingForAJobDescription]})]}),(0,j.jsxs)("div",{className:v.contact__wrapper,children:["Contacts: ",Object.keys(t.contacts).map((function(e){return(0,j.jsx)(m,{contactKey:e,contactValue:t.contacts[e]},e)}))]}),n&&(0,j.jsx)(h.Z,{logo:"edit",action:s})]})}var N=n(5705);function b(e){var t=e.profile,n=e.updateProfileData;var s=(0,l.I0)(),o=t;function r(e){o.lookingForAJob="true"!==e.target.value}return t.aboutMe?o.aboutMe=t.aboutMe:o.aboutMe="",(0,j.jsxs)("div",{className:"profile__form",children:[(0,j.jsx)(N.J9,{initialValues:o,onSubmit:function(e,t){var s=t.resetForm;!function(e){n(e)}(e),s({values:""})},children:function(){return(0,j.jsxs)(N.l0,{children:[(0,j.jsxs)("div",{className:"form__fields",children:[Object.keys(o).filter((function(e){return"lookingForAJob"!==e&&"lookingForAJobDescription"!==e&&"contacts"!==e&&"photos"!==e&&"userId"!==e})).map((function(e){return(0,j.jsxs)("div",{children:[(0,j.jsx)("span",{children:e})," ",(0,j.jsx)(N.gN,{className:"field",name:e,placeholder:e},e)]},e)})),(0,j.jsxs)("label",{children:["Looking for a job:",(0,j.jsx)(N.gN,{type:"checkbox",name:"lookingForAJob",onClick:r})]}),o.lookingForAJob&&(0,j.jsxs)("div",{children:[(0,j.jsx)("span",{children:"About my skills:"}),(0,j.jsx)(N.gN,{name:"lookingForAJobDescription",placeholder:"what about job?"})]}),(0,j.jsxs)("div",{className:"form__contacts",children:[(0,j.jsx)("span",{children:"CONTACTS:"}),Object.keys(o.contacts).map((function(e){return null===o.contacts[e]&&(o.contacts[e]=""),(0,j.jsxs)("div",{children:[(0,j.jsx)("span",{children:e},"span-".concat(e)),(0,j.jsx)(N.gN,{className:"field",name:"contacts.".concat(e),placeholder:e},e)]},"div-".concat(e))}))]})]}),(0,j.jsx)("div",{className:"",children:(0,j.jsx)(h.Z,{logo:"Send",type:"submit"})})]})}}),(0,j.jsxs)("div",{children:[(0,j.jsx)("label",{children:" Change avatar:"}),(0,j.jsx)("input",{className:v.input,type:"file",onChange:function(e){e.target.files.length&&(e.target.files[0],s((0,f.Ju)()))}})]})]})}var P={info__wrapper:"ProfileInfo_info__wrapper__KP3ip",avatar__container:"ProfileInfo_avatar__container__Mt2yk",description__container:"ProfileInfo_description__container__ZYUXG",info__avatar:"ProfileInfo_info__avatar__XWn1K"};function w(e){var t=e.isOwner,n=(0,c.useState)(!1),s=(0,u.Z)(n,2),o=s[0],r=s[1],i=(0,l.v9)((function(e){return e.profilePage.profile})),a=(0,l.I0)();if(!i)return(0,j.jsx)(d.Z,{});return(0,j.jsxs)("div",{className:P.info__wrapper,children:[(0,j.jsx)("div",{className:P.avatar__container,children:(0,j.jsx)("div",{className:P.info__avatar,children:(0,j.jsx)("img",{src:i.photos.small?i.photos.small:_,alt:""})})}),(0,j.jsxs)("div",{className:P.description__container,children:[(0,j.jsx)(x,{}),o?(0,j.jsx)(b,{profile:i,updateProfileData:function(e){!function(e){a((0,f.xU)(e))}(e),r(!1)}}):(0,j.jsx)(g,{profile:i,isOwner:t,goToEditMode:function(){r(!0)}})]})]})}function k(e){var t=e.post,n=e.like;return(0,j.jsxs)("div",{className:"post__item__wrapper",children:[(0,j.jsx)("div",{className:"post__avatar"}),(0,j.jsx)("div",{className:"post__text",children:t}),(0,j.jsx)("div",{className:"post__setup",children:(0,j.jsxs)("div",{className:"post__likes",children:["Likes: ",n]})})]})}function y(e){var t=e.props;return(0,j.jsxs)("div",{className:"posts__wrapper",children:[(0,j.jsx)("div",{children:(0,j.jsx)("h3",{children:"My post"})}),(0,j.jsxs)("div",{className:"post__wrapper",children:[(0,j.jsx)("div",{className:"new__post__wrapper",children:(0,j.jsx)(A,{updateNewPostText:t.updateNewPostText,addPost:t.addPost})}),(0,j.jsx)("div",{children:t.postsData.map((function(e){return(0,j.jsx)(k,{post:e.post,like:e.likes,id:e.id},e.id)}))})]})]})}function A(e){var t=e.updateNewPostText,n=e.addPost;return(0,j.jsx)(N.J9,{initialValues:{newPostBody:""},onSubmit:function(e,s){var o=s.resetForm;!function(e){t(e),n()}(e.newPostBody),o({values:""})},children:function(){return(0,j.jsxs)(N.l0,{children:[(0,j.jsx)("div",{className:"",children:(0,j.jsx)(N.gN,{name:"newPostBody",as:"textarea",placeholder:"enter text"})}),(0,j.jsx)("div",{className:"",children:(0,j.jsx)(h.Z,{logo:"Send",type:"submit"})})]})}})}function D(e){return(0,j.jsx)(y,{props:e})}var I=(0,l.$j)((function(e){return{newPostText:e.profilePage.newPostText,postsData:e.profilePage.posts}}),(function(e){return{updateNewPostText:function(t){e(f.Nw.updateNewPostTextActionCreator(t))},addPost:function(){e(f.Nw.addPostActionCreator())}}}))(c.memo(D)),Z="Profile_profile__wrapper__A2QPH";function C(e){var t=e.isOwner;return(0,j.jsxs)("div",{className:Z,children:[(0,j.jsx)(w,{isOwner:t}),(0,j.jsx)(I,{})]})}var F=n(7689),T=function(e){return{isAuth:e.auth.isAuth}};var J=n(1666),M=function(e){(0,i.Z)(n,e);var t=(0,a.Z)(n);function n(){return(0,o.Z)(this,n),t.apply(this,arguments)}return(0,r.Z)(n,[{key:"profileRefresh",value:function(){var e=this.props.router.params.userId;e||(e=this.props.loggedUserId),this.props.getUserProfile(e),this.props.getStatus(e)}},{key:"componentDidMount",value:function(){this.profileRefresh()}},{key:"componentDidUpdate",value:function(e,t,n){this.props.router.params.userId!==e.router.params.userId&&this.profileRefresh()}},{key:"render",value:function(){return(0,j.jsx)(C,{isOwner:!this.props.router.params.userId})}}]),n}(c.Component);var O=(0,J.qC)((0,l.$j)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,loggedUserId:e.auth.userId}}),{getUserProfile:f.et,getStatus:f.lR}),(function(e){return function(t){var n=(0,F.TH)(),o=(0,F.s0)(),r=(0,F.UO)();return(0,j.jsx)(e,(0,s.Z)((0,s.Z)({},t),{},{router:{location:n,navigate:o,params:r}}))}}),(function(e){return(0,l.$j)(T,{})((function(t){return t.isAuth?(0,j.jsx)(e,(0,s.Z)({},t)):(0,j.jsx)(F.Fg,{to:"/login"})}))}))(M)}}]);
//# sourceMappingURL=244.85e57f63.chunk.js.map